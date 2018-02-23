import React from 'react';

import { storiesOf } from '@storybook/react';

import EquationBox from "components/EquationBox";

storiesOf("Equation Box", module)
    .add("Default", () => <EquationBox />);