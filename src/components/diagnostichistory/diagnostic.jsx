import { CategoryScale, Chart as ChartJs, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2'
import axios from 'axios'

ChartJs.register(
    CategoryScale,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,

)

const JessicaDiagnosis = () => {
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState(null);

    const username = 'coalition';
    const password = 'skills-test';
    const Auth = btoa(`${username}:${password}`);

    const API = {
        method: 'GET',
        url: 'https://fedskillstest.coalitiontechnologies.workers.dev',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Auth}`
        }
    };

    const ChartHistory = async () => {
        try {
            const response = await axios.get(API.url, { headers: API.headers });
            setUsers(response.data);

            const FindJessica = (response.data).find(user => user.name === 'Jessica Taylor');
            setItems(FindJessica);

        } catch (error) {
            console.log('error', error);
        }
    };
    useEffect(() => {
        ChartHistory();
    }, [])

    if (!items || !items.diagnosis_history) {
        return <div>Loading...</div>;
    }

    const DiagnosticHistory = items.diagnosis_history.reverse();
    const months = DiagnosticHistory.map(entry => `${entry.month} ${entry.year}`);
    const Systolic = DiagnosticHistory.map(entry => entry.blood_pressure.systolic.value);
    const Diastolic = DiagnosticHistory.map(entry => entry.blood_pressure.diastolic.value);

    const Data = {
        labels: months,
        datasets: [
            {
                label: 'Systolic',
                data: Systolic,
                fill: false,
                backgroundColor: '#e66fd2',
                borderColor: '#e66fd2',
            },

            {
                label: 'Diastolic',
                data: Diastolic,
                fill: false,
                backgroundColor: '#8c6fe6',
                borderColor: '#8c6fe6',
            }

        ]
    }

    const Options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Blood Pressure',
            },
        },
        scales: {
            y: {
                min: 60,
                max: 160,
                ticks: {
                    stepSize: 20
                }
            }
        }
    };


    return (
        <div className='bg-[#f4f0fe] rounded-2xl w-full'>
            <Line data={ Data} options={Options} />
        </div>
    )
}

export default JessicaDiagnosis