import classNames from 'classnames/bind';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAnglesLeft, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

import '@/pages/ManagerAccount/index.css';
import '@/pages/ManagerAccount/DataTableDemo.css';
import config from '@/config';
import MyBtn from '@/components/Button';
import { SearchIcon, TrashSmallIcon, MedicalResultIcon, PencilSmallIcon } from '@/components/Icons';
import FirstItem from '@/components/Tabs/FirstItem';
import SecondItem from '@/components/Tabs/SecondItem';
import ExamTab from './TabDetail/ExamTab';

import Tabs from '@/components/Tabs';
import * as meformService from '@/services/meformService';
import * as specFormService from '@/services/specformService';
import * as personService from '@/services/personService';
import styles from './DetailInformation.module.scss';

const cx = classNames.bind(styles);


function DetailInformation() {
    const location = useLocation();
    const specForm = location.state;
    // console.log(specForm);

    const dataTab = [
        {
            id: "tab1",
            title: "Exam",
            content: <FirstItem />,
        },
        {
            id: "tab2",
            title: "Result",
            content: <SecondItem />,
        },
        {
            id: "tab3",
            title: "Ultrasound result",
            content: <ExamTab/>,
        }
    ]

    useEffect(() => {
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link className={cx('btn-back')} to={config.routes.specialistChecklist}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faAnglesLeft} />
                    </span>
                </Link>
                <h2 className={cx('header-title')}>Detail Information</h2>
            </div>

            <div className={cx('body')}>
                <div className={cx('info')}>
                    <div className={cx('info-form')}>
                        <p>{`ID Form: ${specForm.specFormId}`}</p>
                        <p>{`Date: ${specForm.dateStr}`}</p>
                    </div>
                    <div className={cx('info-form')}>
                        <p>{`Patient's Full Name: ${specForm.patientName}`}</p>
                        <p>{`Doctor's Full Name: ${specForm._person.name}`}</p>
                    </div>
                </div>

                <div>
                    <Tabs dataTab={dataTab}></Tabs>
                </div>
            </div>
        </div>
    );
}

export default DetailInformation;
