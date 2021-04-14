import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'




import RestaurantsStack from './RestaurantsStack'
import SearchStack from './SearchStack'
import FavoritesStack from './FavoritesStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import AccountStack from './AccountStack'
import { Icon } from 'react-native-elements'


const Tab = createBottomTabNavigator()

export default function Navigations() {

    const screenOptions =(route,color)=> {
        let iconName

        switch (route.name) {
            case "restaurants":
                iconName="food-drumstick-outline"
                break;

            case "search":
                iconName="map-marker-plus-outline"
                break;

             case "favorites":
                iconName="cards-heart"
                 break;

             case "topRestaurants":
                iconName="star-face"
                break;

             case "account":
                iconName="account-circle-outline"
                 break;
        }

        return(
            <Icon
            type="material-community"
            name={iconName}
            size={22}
            color={color}
            />
        )

        
    }
    
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName="account"
            tabBarOptions={{
                inactiveTintColor:"#cdd6b7",
                activeTintColor:"#8cc43c"
            }}
            
            screenOptions = {({route})=> ({
                tabBarIcon:({color})=> screenOptions(route,color)
            })}
            >

                <Tab.Screen
                 name="restaurants"
                 component={RestaurantsStack}
                 options={{title:"Restaurantes "}}
                />

                <Tab.Screen
                 name="search"
                 component={SearchStack}
                 options={{title:"Buscar "}}
                />

                <Tab.Screen
                 name="favorites"
                 component={FavoritesStack}
                 options={{title:"Favoritos "}}
                />

                <Tab.Screen
                 name="topRestaurants"
                 component={TopRestaurantsStack }
                 options={{title:"Top 5 "}}
                />

                <Tab.Screen
                 name="account"
                 component={AccountStack}
                 options={{title:"Cuenta "}}
                />

               
            </Tab.Navigator>
        </NavigationContainer>
    )
}
