import React, {useEffect, useState} from 'react'

import JessicaDiagnosis from '../components/diagnostichistory/diagnostic';
import axios from 'axios'

const Home = () => {
    const [users, setUsers] = useState([]);
    const [jessicainfo, setJessicainfo] = useState(null);

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

    const PatientData = async () => {
        try {
            const resp = await axios.get(API.url, { headers: API.headers });
            setUsers(resp.data);

            const JessicaDetail = (resp.data).find(user => user.name === 'Jessica Taylor');
            setJessicainfo(JessicaDetail);

        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        PatientData()
    }, [])



    return (
        <main className='pt-[6rem]'>
            <div className='main-section flex justify-between mx-[1.5rem]'>

                <div className='first-part flex flex-col p-4 rounded-xl bg-[#fff] basis-[24%]' >
                    <h1 className='mb-4 font-[600]'>Patients</h1>
                    {
                        users.map((item, index) => {

                            return (

                                <div className='flex items-start mb-3' key={index}>
                                    <img src={item.profile_picture} alt="" className='w-[35px] h-[35px]' />
                                    <div className='flex flex-col items-start ml-2'>
                                        <b className='text-[10px]'>{item.name}</b>
                                        <p className='text-[11px]'>{item.gender}<span className='ml-1'>{item.age}</span></p>
                                        <p>{ item.diagnosis_history.month}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='second-part basis-[76%]'>

                {jessicainfo && (
                    <div className='flex justify-between p-0'>
                        <div className='basis-[72%] rounded p-4'>
                            <div className='diagnostic-history bg-[#fff] mt-[-1rem] rounded-xl p-4'>
                                    <h2 className='capitalize'>diagnostic-history</h2>
                                    <JessicaDiagnosis/>
                                {/*jessicainfo.diagnosis_history.map((history, index) => (
                                    <div key={index} className='mb-4'>
                                        <p><strong>Month:</strong> {history.month}</p>
                                        <p><strong>Year:</strong> {history.year}</p>
                                        <p><strong>Systolic Blood Pressure:</strong> {history.blood_pressure.systolic.value} ({history.blood_pressure.systolic.levels})</p>
                                        <p><strong>Diastolic Blood Pressure:</strong> {history.blood_pressure.diastolic.value} ({history.blood_pressure.diastolic.levels})</p>
                                        <p><strong>Heart Rate:</strong> {history.heart_rate.value} ({history.heart_rate.levels})</p>
                                        <p><strong>Respiratory Rate:</strong> {history.respiratory_rate.value} ({history.respiratory_rate.levels})</p>
                                        <p><strong>Temperature:</strong> {history.temperature.value} ({history.temperature.levels})</p>
                                    </div>
                                ))*/}
                            </div>

                            <div className='diagnostic-list mt-6 rounded-xl p-4 bg-[#fff]'>
                                    <h2 className='capitalize font-[600] pb-4'>diagnostic list</h2>

                                        <div className='px-4 mb-4 flex justify-between py-1 bg-[#fafafa] rounded-2xl'>
                                            <strong className='text-[13px]'>Problem/Diagnosis</strong>
                                            <strong className='text-[13px]'>Description</strong>
                                            <strong className='text-[12px] mr-16'>status</strong>
                                        </div>

                                {jessicainfo.diagnostic_list.map((item, index) => (
                                    <div className='flex mb-4 justify-around' key={index}>
                                        <div className='basis-[31%] flex flex-col items-start'>

                                            <p className='text-[12px]'>{item.name}</p>
                                        </div>
                                        <div className='basis-[31%] flex flex-col '>

                                            <p className='text-[12px]'>{ item.description}</p>
                                        </div>
                                        <div className='pl-14 basis-[31%] flex flex-col justify-center'>

                                            <p className='text-[12px]'>{ item.status}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='third-part basis-[30%] flex flex-col rounded-xl'>
                            <div className='jessica flex flex-col mb-8 p-4 bg-[#fff] rounded'>
                                <div className='flex flex-col items-center'>
                                    <img src={jessicainfo.profile_picture} alt="" className='mb-2 w-[100px] h-[100px]' />
                                    <b>{jessicainfo.name}</b>
                                </div>
                                <div className='flex flex-col items-start mt-4 mb-[-0.5rem]'>
                                    <p className='text-[10px]'>Date of Birth</p>
                                    <b className='text-[11px]'>{jessicainfo.date_of_birth}</b>
                                </div>
                                <div className='flex flex-col items-start mt-4 mb-[-0.5rem]'>
                                    <p className='text-[10px]'>Gender</p>
                                    <b className='text-[11px]'>{jessicainfo.gender}</b>
                                </div>
                                <div className='flex flex-col items-start mt-4 mb-[-0.5rem]'>
                                    <p className='text-[10px]'>Contact Info</p>
                                    <b className='text-[11px]'>{jessicainfo.phone_number}</b>
                                </div>
                                <div className='flex flex-col items-start mt-4 mb-[-0.5rem]'>
                                    <p className='text-[10px]'>Emergency Contact</p>
                                    <b className='text-[11px]'>{jessicainfo.emergency_contact}</b>
                                </div>
                                <div className='flex flex-col items-start mt-4 mb-[-0.5rem]'>
                                    <p className='text-[10px]'>Insurance Provider</p>
                                    <b className='text-[11px]'>{jessicainfo.insurance_type}</b>
                                </div>

                                <button className='bg-[#01f0d0] w-[180px] text-[#000] rounded-2xl mx-[auto] my-6 text-[14px] py-1'>
                                    Show all information
                                </button>
                            </div>

                            <div className='Lab-result flex flex-col rounded-xl p-4 bg-[#fff]'>
                                <h2 className='mb-4 font-[600] capitalize'>lab results</h2>
                                {jessicainfo.lab_results.map((list, index) => (
                                    <div className='flex flex-col py-2 items-start' key={index}>
                                        <p>{list}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>


            </div>

        </main>
    )
}

export default Home