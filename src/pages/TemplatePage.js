// TemplatePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplatePage.css';

const templates = [
  { id: 1, title: 'Template 1', image: 'https://cdn.enhancv.com/predefined-examples/DuL0GzrjhjZHr0mwbwgPitMJ3Z20hVmYHQciz6rm/image.png', withPhoto: true, columns: 1 },
  { id: 2, title: 'Template 2', image: 'https://www.myperfectresume.com/wp-content/uploads/2024/03/aeronautical-engineer-resume-format.svg', withPhoto: false, columns: 2 },
  { id: 3, title: 'Template 3', image: 'https://cdn-images.zety.com/pages/resume_formats_template_nanica.png', withPhoto: true, columns: 2 },
  { id: 4, title: 'Template 4', image: 'https://images.squarespace-cdn.com/content/v1/5a0a3c9a8fd4d276810a8a9e/1698864127374-OJCFKLMY3BXCXFUO8WK6/Resume-Template-10-pdf.png', withPhoto: false, columns: 1 },
  { id: 5, title: 'Template 5', image: 'https://www.hubspot.com/hs-fs/hubfs/resume-templates-word_24.webp?width=415&height=536&name=resume-templates-word_24.webp', withPhoto: true, columns: 1 },
  { id: 6, title: 'Template 6', image: 'https://cdn.enhancv.com/predefined-examples/DuL0GzrjhjZHr0mwbwgPitMJ3Z20hVmYHQciz6rm/image.png', withPhoto: false, columns: 2 },
];

const colors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c', '#8e44ad', '#d35400'];

const TemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#3498db');
  const [filters, setFilters] = useState({ withPhoto: false, columns: null });
  const navigate = useNavigate();

  document.documentElement.style.setProperty('--theme-color', selectedColor);

  const handleTemplateClick = (id) => setSelectedTemplate(id);
  const handleColorClick = (color) => setSelectedColor(color);

  const handleFilterChange = (filterType) => {
    setFilters((prev) => ({ ...prev, [filterType]: !prev[filterType] }));
  };

  const handleColumnFilterChange = (columns) => {
    setFilters((prev) => ({ ...prev, columns: prev.columns === columns ? null : columns }));
  };

  const clearFilters = () => setFilters({ withPhoto: false, columns: null });

  const filteredTemplates = templates.filter((template) => {
    if (filters.withPhoto && !template.withPhoto) return false;
    if (filters.columns && filters.columns !== template.columns) return false;
    return true;
  });

  const handleChooseTemplate = () => {
    if (selectedTemplate) {
      navigate('/select-resume');
    } else {
      alert("Please select a template first.");
    }
  };

  return (
    <div className="template-page">
      <div className="filters-section">
        <h2>Color</h2>
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="color-circle"
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
              role="button"
              tabIndex="0"
              aria-label={`Select color ${color}`}
              onKeyDown={(e) => e.key === 'Enter' && handleColorClick(color)}
            />
          ))}
        </div>

        <h2>Filters</h2>
        <div className="filter-options">
          <label>
            <input
              type="checkbox"
              checked={filters.columns === 1}
              onChange={() => handleColumnFilterChange(1)}
            />
            1 Column
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.columns === 2}
              onChange={() => handleColumnFilterChange(2)}
            />
            2 Columns
          </label>
        </div>
        
        <button className="clear-filters" onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="main-content">
        <h1>Popular templates for students</h1>
        <p>You can always change your template later.</p>
        
        <div className="template-container">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`template-card ${selectedTemplate === template.id ? 'active' : ''}`}
                onClick={() => handleTemplateClick(template.id)}
                role="button"
                tabIndex="0"
                aria-label={`Select template ${template.title}`}
                onKeyDown={(e) => e.key === 'Enter' && handleTemplateClick(template.id)}
              >
                <img src={template.image} alt={template.title} />
                <p>{template.title}</p>
              </div>
            ))
          ) : (
            <p className="no-templates-message">No templates match the selected filters.</p>
          )}
        </div>

        <div className="action-buttons">
          <button className="choose-later">Choose Later</button>
          <button className="choose-template" onClick={handleChooseTemplate}>Choose Template</button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
