import React, { useState, useCallback, useEffect } from "react";

import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://ng-fitness-tracker-23ebe.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading ...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={styles.MealsError}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        id={meal.id}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
