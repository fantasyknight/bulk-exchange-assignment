interface ErrorBlockProps {
  errors?: {
    [key: string]: string[];
  };
}

const ErrorBlock = ({ errors }: ErrorBlockProps) => {
  if (!errors) return null;

  const errorKeys = Object.keys(errors);
  if (errorKeys.length === 0) return null;

  return (
    <div className="p-4 mb-6 rounded-2xl border border-red-700">
      <ul>
        {errorKeys.map((key, index) => (
          <li key={index}>
            {errors[key].map((error, innerIndex) => (
              <p className="text-red-600" key={innerIndex}>
                - {error}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorBlock;
