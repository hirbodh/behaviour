import React from 'react';

const FormWrapper = ({ children }) => {
  return React.Children.map(children, (child) => {
    if (child.props?.className?.includes('form-group')) {
      const modifiedChildren = React.Children.map(child.props.children, (grandChild) => {
        if (grandChild.type === 'input' && !grandChild.props.className.includes('form-control')) {
          return React.cloneElement(grandChild, {
            className: grandChild.props.className
              ? `${grandChild.props.className} form-control`
              : 'form-control',
          });
        }
        return grandChild;
      });
      return React.cloneElement(child, { ...child.props, children: modifiedChildren });
    }
    return child;
  });
};

export default FormWrapper;
