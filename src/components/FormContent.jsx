import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';

const contentMap = {
  firstName: 'First Name',
  lastName: 'Last Name',
  nickName: 'Nick Name',
  email: 'Email',
  street: 'Street',
  zip: 'Zip',
  houseNumber: 'House Number',
  city: 'City',
}

function FormContent() {
  const formData = useSelector(state => state.form);

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
      <div className="container">
        <ul>
          {Object.keys(contentMap).map((value, index) => {
            return <li key={index}>
                  {contentMap[value]}: {formData[value]}
            </li>
          })}
        </ul>
      </div>
  );
}

export default FormContent;
