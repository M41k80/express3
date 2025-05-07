import React from 'react';
import { View } from 'react-native';
import WeightChart from './WeightChart';
import RepsChart from './RepsChart';

const DashboardCharts = () => {
    return (
        <View>
            <RepsChart />
            <WeightChart />
        </View>
    );
};

export default DashboardCharts;
