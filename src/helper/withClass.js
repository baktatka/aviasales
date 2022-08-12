const withClass = (Component, className) => {
  return (props) => (
    <div className={className}>
      <Component {...props} />
    </div>
  );
};

export default withClass;
