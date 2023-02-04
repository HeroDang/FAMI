// import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
/* A library that allows you to validate the props you pass to your React components. */
import PropTypes from 'prop-types';

import { InputTextarea } from 'primereact/inputtextarea';
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";

import { ThermometerIcon, ArmIcon, WeightIcon, PulseIcon, BreathIcon, HeightIcon } from '@/components/Icons';
import * as examService from '@/services/examService';
import ImageComponent from '@/components/Image';
import classNames from 'classnames/bind';
import styles from './TabDetail.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function UltrasoundResultTab({overResult}) {
    const [result, setResult] = useState(overResult)
    
    const handleChange = (e) => {
        const val = (e.target && e.target.value) || '';
        setResult(val)
    }

    const responsiveOptions = [
        {
          breakpoint: "991px",
          numVisible: 4
        },
        {
          breakpoint: "767px",
          numVisible: 3
        },
        {
          breakpoint: "575px",
          numVisible: 1
        }
      ];

    const images = [
        {
            itemImageSrc: "https://primereact.org/images/galleria/galleria1.jpg",
            thumbnailImageSrc:
              "https://primereact.org/images/galleria/galleria1s.jpg",
            alt: "Description for Image 1",
            title: "Title 1"
          },
          {
            itemImageSrc: "https://primereact.org/images/galleria/galleria2.jpg",
            thumbnailImageSrc:
              "https://primereact.org/images/galleria/galleria2s.jpg",
            alt: "Description for Image 2",
            title: "Title 2"
          }
    ];

    const itemTemplate = (item) => {
        return (
          <div className="card flex justify-content-center">
            <Image src={item.itemImageSrc} alt={item.alt} width="100%" preview />
          </div>
        );
      };
    
      const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} />;
      };

    return (
        <div className={cx('grid', 'wide')}>
            <div className={cx('row')}>
                <div className={cx('input-group')}>
                    <label className={cx('title-input')} htmlFor="result">Image</label>
                    <div className={cx('image-group')}>
                        <ImageComponent src="https://rimereact.org/images/galleria/galleria2s.jpg" alt="No Image" width="400px" height="400px"/>

                        {/* <Galleria
                            value={images}
                            responsiveOptions={responsiveOptions}
                            numVisible={5}
                            style={{ maxWidth: "500px" }}
                            item={itemTemplate}
                            thumbnail={thumbnailTemplate}
                        /> */}
                    </div>
                </div>
            </div>
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
            <div className={cx('row')}>
                <div className={cx('input-group')}>
                    <label className={cx('title-input')} htmlFor="result">Conclusion</label>
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

UltrasoundResultTab.prototype={
    overResult: PropTypes.string,
}

export default UltrasoundResultTab;