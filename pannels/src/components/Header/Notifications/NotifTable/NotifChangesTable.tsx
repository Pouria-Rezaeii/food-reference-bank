import React from 'react'
import NotifChangesTableRow from './NotifChangesTableRow';
import styles from './NotifChangesTable.module.css';

// bookmarked by pouria
// types should be set correctly

interface IProps {
  changes: any
}

const NotifChangesTable: React.FC<IProps> = ({ changes }) => {
  return (
    <div className={styles.tableBox}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th>عنوان</th>
            <th>وضعیت فعلی</th>
            <th>وضعیت جدید</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(changes).map((change, index: number) => {
            return <NotifChangesTableRow key={index} changeTitle={change} change={changes[change]} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default NotifChangesTable
