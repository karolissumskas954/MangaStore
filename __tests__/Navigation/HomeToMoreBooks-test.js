import React from 'react';
import HomeScreen from '../../src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent, screen } from "@testing-library/react-native";

describe("Go to More Books Screen", () => {
    test('Navigation on button press', async () => {
        const component = (
            <NavigationContainer>
                <HomeScreen />
            </NavigationContainer>
        );
        render(component);
        const toClick = await screen.findByTestId('moreButton');
        setTimeout(() => {
            fireEvent.press(toClick);
        }, 1000);
        expect(component.firstChild).toMatchSnapshot()
    });
});