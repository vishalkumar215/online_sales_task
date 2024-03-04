// DynamicForm.js

import React, { useState } from 'react';

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([
    // Initial form fields (you can customize this)
    { id: 1, type: 'text', label: 'Name', value: '', error: '' },
  ]);

  const handleAddField = (fieldType) => {
    // Add a new form field dynamically based on field type
    const newField = { id: Date.now(), type: fieldType, label: '', value: '', error: '' };
  
    // If the field type is 'dropdown', add an 'options' array
    if (fieldType === 'dropdown') {
      newField.options = ['Option 1', 'Option 2']; // Default options
    }
  
    setFormFields([...formFields, newField]);
  };

  const handleRemoveField = (idToRemove) => {
    // Remove a form field dynamically
    const updatedFields = formFields.filter((field) => field.id !== idToRemove);
    setFormFields(updatedFields);
  };

  const handleLabelChange = (id, label) => {
    // Update form field label
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, label } : field
    );
    setFormFields(updatedFields);
  };
  const handleAddOption = (fieldId, newOption) => {
    const updatedFields = formFields.map((field) => {
      if (field.id === fieldId && field.type === 'dropdown') {
        // Append the new option to the existing options array
        const updatedOptions = [...field.options, newOption];
        return { ...field, options: updatedOptions };
      }
      return field;
    });
    setFormFields(updatedFields);
  };

  const handleChange = (id, value) => {
    // Update form field value
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, value, error: '' } : field
    );
    setFormFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    const updatedFields = formFields.map((field) => {
      if (field.value.trim() === '') {
        return { ...field, error: 'This field is required.' };
      }
      return field;
    });
    setFormFields(updatedFields);

    // Check if any errors exist
    const hasErrors = updatedFields.some((field) => field.error !== '');
    if (!hasErrors) {
      // Handle successful form submission (e.g., API calls, etc.)
      console.log('Form data:', updatedFields);
    }
  };

  const saveFormConfig = () => {
    const formConfigJSON = JSON.stringify(formFields);
    localStorage.setItem('formConfig', formConfigJSON);
  };

  const loadFormConfig = () => {
    const formConfigJSON = localStorage.getItem('formConfig');
    if (formConfigJSON) {
      const formConfig = JSON.parse(formConfigJSON);
      setFormFields(formConfig);
    }
  };

  return (
    <div style={{backgroundColor:'#606C38',textAlign:'center',width:'99vw' ,height:'200vh'}}>
        
    <div >
    <h1>Form Generator</h1>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.id}>
            <label htmlFor={`field_${field.id}`}>Field Label:</label>
            <input
              type="text"
              id={`field_${field.id}`}
              value={field.label}
              onChange={(e) => handleLabelChange(field.id, e.target.value)}
            />
            {field.type === 'text' && (
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
            {field.type === 'textarea' && (
              <textarea
                value={field.value}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
            {field.type === 'dropdown' && (
      <div>
        <label>{field.label}</label>
        <select value={field.value} onChange={(e) => handleChange(field.id, e.target.value)}>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* Add an input field for adding new options */}
        <input
          type="text"
          placeholder="New Option"
          onChange={(e) => handleAddOption(field.id, e.target.value)}
        />
      </div>
    )}
            {field.type === 'checkbox' && (
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => handleChange(field.id, e.target.checked)}
              />
            )}
            {field.type === 'radio' && (
              <input
                type="radio"
                id={`field_${field.id}`}
                name={`radioGroup_${field.id}`}
                value="radioOption"
                checked={field.value}
                onChange={(e) => handleChange(field.id, e.target.checked)}
              />
            )}
            {field.error && <p style={{ color: 'red' }}>{field.error}</p>}
            <button type="button" onClick={() => handleRemoveField(field.id)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('text')}>
          Add Text Field
        </button>
        <button type="button" onClick={() => handleAddField('textarea')}>
          Add Text Area
        </button>
        <button type="button" onClick={() => handleAddField('dropdown')}>
          Add Dropdown
        </button>
        <button type="button" onClick={() => handleAddField('checkbox')}>
          Add Checkbox
        </button>
        <button type="button" onClick={() => handleAddField('radio')}>
          Add Radio Button
        </button>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={saveFormConfig}>
  Save Form Configuration
</button>
<button type="button" onClick={loadFormConfig}>
  Load Form Configuration
</button>
        </form>
        </div>
        </div>
  );
};

export default DynamicForm;


