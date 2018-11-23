import React, {Component} from 'react';
import {AppNavigator} from "./Navigation/AppNavigator";
import {createAppContainer} from "react-navigation";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer/>
    );
  }
}
