import React from 'react'

interface ICompanyInfo {
  id: number;
  name: string;
  manager_name: string;
  city: string;
  phone: string;
  category_title: string
}

interface IProps {
  companyInfo: ICompanyInfo
}

const CompanyInfoTable: React.FC<IProps> = ({ companyInfo }) => {
  return (
    <div className='notifInfo'>
      <p>نام شرکت : {companyInfo.name} </p>
      <p>نام مدیر شرکت : {companyInfo.manager_name} </p>
      <p>عنوان دسته بندی : {companyInfo.category_title} </p>
      <p>شهر : {companyInfo.city} </p>
      <p>تلفن : {companyInfo.phone} </p>
    </div>
  )
}

export default CompanyInfoTable
