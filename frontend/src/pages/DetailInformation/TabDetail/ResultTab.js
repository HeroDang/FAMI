// import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
/* A library that allows you to validate the props you pass to your React components. */
import PropTypes from 'prop-types';

import { InputTextarea } from 'primereact/inputtextarea';

import { ThermometerIcon, ArmIcon, WeightIcon, PulseIcon, BreathIcon, HeightIcon } from '@/components/Icons';
import * as examService from '@/services/examService';
import classNames from 'classnames/bind';
import styles from './TabDetail.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ResultTab({overResult}) {
    const [result, setResult] = useState(overResult)
    
    const handleChange = (e) => {
        const val = (e.target && e.target.value) || '';
        setResult(val)
    }

    return (
        <div className={cx('grid', 'wide')}>
            <div className={cx('row')}>
                <div className={cx('input-group')}>
                    <label className={cx('title-input')} htmlFor="result">Result</label>
                    <InputTextarea
                        className={cx('input-text-area')}
                        id="result"
                        value={result}
                        onChange={(e) => handleChange(e)}
                        required
                        rows={3}
                        cols={20}
                    />
                </div>
            </div>
        </div>
    );
}

ResultTab.prototype={
    overResult: PropTypes.string,
}

export default ResultTab;