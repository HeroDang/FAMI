import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/319188863_3404549463167993_3785304119792356687_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=hNBq788jhvMAX_w72_V&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfABKNnsegT7RMTYPvP3saUxuyoJsKRBN8Oi2I5LhS5M7w&oe=63BC8488"
                alt="Avatar"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
