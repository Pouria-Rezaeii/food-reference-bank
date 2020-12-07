import React from 'react';
import styles from './NotifChangesTable.module.css';

// bookmarked by pouria
// types should be set correctly

interface IProps {
change : any;
changeTitle: string;
}

const NotifChangesTableRow: React.FC<IProps> = ({change, changeTitle}) => {
  return (
    <tr className = {styles.row}>
      <td>{changeTitle}</td>
      <td>{change.after}</td>
      <td>{change.before}</td>
    </tr>
  )
}

export default NotifChangesTableRow
