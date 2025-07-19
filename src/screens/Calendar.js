// PLEASE NOTE: The code to construct the calendar (the part where it displays the months at the top) was found online, and was changed to fit the needs of this app
// Find the code used here: https://github.com/mendsalbert/medicine-reminder-app/blob/main/app/calendar/index.tsx

import React, { useContext, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import PlantContext from '../context/PlantContext';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { plants } = useContext(PlantContext);


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

    // Add empty cells before first day of the month
    for (let i = 0; i < firstDay; i++) {
      week.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Add day cells
    for (let day = 1; day <= days; day++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      const isToday = new Date().toDateString() === date.toDateString();

      week.push(
        <TouchableOpacity
          key={day}
          style={[styles.calendarDay, isToday && styles.today]}
          onPress={() => setSelectedDate(date)}
        >
          <Text style={[styles.dayText, isToday && styles.todayText]}>{day}</Text>
        </TouchableOpacity>
      );

      if ((firstDay + day) % 7 === 0 || day === days) {
        calendar.push(
          <View key={day} style={styles.calendarWeek}>
            {week}
          </View>
        );
        week = [];
      }
    }

    return calendar;
  };

  // Render plants scheduled for the selected date (example implementation)
  const renderPlantsForDate = () => {
    if (!plants || plants.length === 0) {
      return <Text style={{ color: '#666' }}>No plants scheduled for this date.</Text>;
    }
    
    const selectedDayStart = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
    );

    const neededToBeWatered = plants.filter((plant) =>{
        if (!plant.dateCreated || !plant.wateringFrequency){ return false;}

        const dateCreated = new Date(plant.dateCreated);
        const d1 = dateCreated.setHours(0,0,0,0);
        const d2 = selectedDayStart.setHours(0,0,0,0);

        const diffTime = d2 - d1; //note that this calculation is in milliseconds and we want to compare how many DAYS apart they are
        const dayDifference = Math.floor (diffTime / (1000 * 60 * 60 * 24)); //so here we are converting it to days

        if (dayDifference >= 0 && dayDifference % plant.wateringFrequency === 0){
            //we are checking to see if the difference of days between date created and current date is greater than 0 (this date is in the future)
            //and then we are checking to see if it is a multiple of the wateringFrequency
            return true; 
        }

        else{
            return false;
        }
    }
    )

    if (neededToBeWatered.length === 0) {
        return <Text style={{ color: '#666' }}>No plants to water on this date.</Text>;
    }

    return neededToBeWatered.map((plant) => (
    <View style={styles.plantBanner} key={plant.id} >
      <Text style={styles.name}>{plant.name}</Text>
      <Text style={styles.type}>
        Type: {plant.type}
      </Text>
      <Text style={styles.info}>
        Frequency: every {plant.wateringFrequency} days
      </Text>
    </View>
  ));
    
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a8e2d", "#146922"]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calendar</Text>
        </View>
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
        </ScrollView>


        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>
            {selectedDate.toLocaleDateString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderPlantsForDate()}
          </ScrollView>

        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginLeft: 15,
  },
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    margin: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  weekdayHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  weekdayText: {
    flex: 1,
    textAlign: "center",
    color: "#666",
    fontWeight: "500",
  },
  calendarWeek: {
    flexDirection: "row",
    marginBottom: 5,
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
    color: "#333",
  },
  today: {
    backgroundColor: "#1a8e2d15",
  },
  todayText: {
    color: "#1a8e2d",
    fontWeight: "600",
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  plantBanner: {
    backgroundColor: '#d1f8d1ff',
    flexDirection: 'column',
    alignItems: 'left',
    padding: 12,
    marginTop: 5,
    marginBottom: 5, 
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
  },
});
