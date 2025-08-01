// PLEASE NOTE: The code to construct the calendar (the part where it displays the months at the top) was found online, and was changed to fit the needs of this app
// Find the code used here: https://github.com/mendsalbert/medicine-reminder-app/blob/main/app/calendar/index.tsx
// Find youtube video tutorial I used here: https://www.youtube.com/watch?v=fcpZeYeINDw&t=18612s

import React, { useContext, useState, useCallback, useRef } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, Platform, Animated } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import PlantContext from '../context/PlantContext';
import NavBar from '../components/NavBar';


const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSchedule, setShowSchedule] = useState(false);
  const slideAnim = useRef(new Animated.Value(500)).current;

  const { plants } = useContext(PlantContext);

  const handleDatePress = (date) => {
    setSelectedDate(date);
    if (!showSchedule) {
      setShowSchedule(true);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  };

  const handleCloseSchedule = () => {
    setShowSchedule(false);
    Animated.spring(slideAnim, {
      toValue: 500,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(selectedDate);

const renderCalendar = () => {
  const calendar = [];
  let week = [];

  const totalCells = firstDay + days; // total slots (empty + actual days)

  for (let i = 0; i < totalCells; i++) {
    if (i < firstDay) {
      // Empty slots before the first day of the month
      week.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    } else {
      const day = i - firstDay + 1;
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = showSchedule && selectedDate.getDate() === day;

      week.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay, 
            isToday && styles.today,
            isSelected && styles.selectedDay
          ]}
          onPress={() => handleDatePress(date)}
        >
          <Text style={[
            styles.dayText, 
            isToday && styles.todayText,
            isSelected && styles.selectedDayText
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    // Complete the week row after 7 elements
    if ((i + 1) % 7 === 0) {
      calendar.push(
        <View key={`week-${i}`} style={styles.calendarWeek}>
          {week}
        </View>
      );
      week = [];
    }
  }

  // Push the last incomplete week
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(<View key={`empty-end-${week.length}`} style={styles.calendarDay} />);
    }
    
    calendar.push(
      <View key="last-week" style={styles.calendarWeek}>
        {week}
      </View>
    );
  }

  return calendar;
};

  // Render plants scheduled for the selected date (example implementation)
  const renderPlantsForDate = () => {
    if (!plants || plants.length === 0) {
      return <Text style={{ color: '#666' }}>No plants scheduled for this date.</Text>;
    }
    
    const neededToBeWatered = plants.filter((plant) => {
        if (!plant.dateCreated || !plant.wateringFrequency) { 
            return false; 
        }

        const dateParts = plant.dateCreated.split('-');
        const plantYear = parseInt(dateParts[0]);
        const plantMonth = parseInt(dateParts[1]) - 1;
        const plantDay = parseInt(dateParts[2]);
        
        const plantStartDate = new Date(plantYear, plantMonth, plantDay);
        const checkDate = new Date(
            selectedDate.getFullYear(), 
            selectedDate.getMonth(), 
            selectedDate.getDate()
        );

        const diffTime = checkDate.getTime() - plantStartDate.getTime();
        const dayDifference = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (dayDifference >= 0 && dayDifference % plant.wateringFrequency === 0) {
            return true; 
        } else {
            return false;
        }
    });

    if (neededToBeWatered.length === 0) {
        return <Text style={{ color: '#666' }}>No plants to water on this date.</Text>;
    }

    return neededToBeWatered.map((plant) => (
        <TouchableOpacity
            key={plant.id}
            onPress={() => navigation.navigate('PlantDetail', { id: plant.id })}
        >
            <View style={styles.plantBanner}>
                <Text style={styles.name}>{plant.name}</Text>
                <Text style={styles.type}>
                    Type: {plant.type}
                </Text>
                <Text style={styles.info}>
                    Frequency: every {plant.wateringFrequency} days
                </Text>
            </View>
        </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#DE3163", "#74b72e"]}
        //colors={["#d97a8d", "#6b9c4b"]} // #1a8e2d
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <View style={styles.content}>
        
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.calendarContainer}>
            <View style={styles.monthHeader}>
              <TouchableOpacity
                onPress={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() - 1,
                      1
                    )
                  )
                }
              >
                <Ionicons name="chevron-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.monthText}>
                {selectedDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      1
                    )
                  )
                }
              >
                <Ionicons name="chevron-forward" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekdayHeader}>
              {WEEKDAYS.map((day) => (
                <Text key={day} style={styles.weekdayText}>
                  {day}
                </Text>
              ))}
            </View>

            {renderCalendar()}
            
          </View>
          
          {!showSchedule && (
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                Tap on a date to see your plant care schedule
              </Text>
            </View>
          )}
        </ScrollView>

        {showSchedule && (
          <Animated.View 
            style={[
              styles.scheduleContainer,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>
                {selectedDate.toLocaleDateString("default", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleCloseSchedule}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
           
            <ScrollView 
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollViewContent}
            >
              {renderPlantsForDate()}
            </ScrollView>
          </Animated.View>
        )}
      </View>
      <NavBar navigation={navigation}/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3', //"#fffdfc", // match common container
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 140 : 120,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#8ebf66", // sprout green title
    marginLeft: 15,
    letterSpacing: 0.5,
  },
  calendarContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    margin: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6b9c4b", // leaf green
  },
  weekdayHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  weekdayText: {
    flex: 1,
    textAlign: "center",
    color: "#a8b4a3", // muted herb gray
    fontWeight: "500",
  },
  calendarWeek: {
    flexDirection: "row",
    marginBottom: 6,
  },
  calendarDay: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  dayText: {
    fontSize: 16,
    color: "#34495E",
  },
  today: {
    backgroundColor: "#d97a8d25", // light petal pink background
  },
  todayText: {
    color: "#d97a8d",
    fontWeight: "600",
  },
  selectedDay: {
    backgroundColor: "#d97a8d", // petal pink highlight
  },
  selectedDayText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  instructionContainer: {
    padding: 20,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#a8b4a3",
    textAlign: "center",
    fontStyle: "italic",
  },
  scheduleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f7f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6b9c4b", // leaf green for headline
    flex: 1,
  },
  plantBanner: {
    backgroundColor: 'white', //"#d1f8d1", // pastel green
    flexDirection: "column",
    padding: 12,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#d97a8b',
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 1.5,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50", // refined deep gray-blue
  },
  type: {
    fontSize: 14,
    color: "#34495E",
  },
});