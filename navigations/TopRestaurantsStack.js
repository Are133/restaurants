import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import {} from '@react-navigation/stack'
import TopRestaurants from '../screens/TopRestaurants'

const Stack = createStackNavigator()

export default function TopRestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
             name="topRestaurants"
             component={TopRestaurants}
             options={{title:"Los mejores restaurantes "}}
            />
        </Stack.Navigator>
    )
}
