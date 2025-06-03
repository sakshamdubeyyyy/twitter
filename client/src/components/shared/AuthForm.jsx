import { Link } from "react-router-dom";

export default function AuthForm({
  title,
  onSubmit,
  isLoading,
  error,
  fields,
  submitText,
  footerText,
  footerLinkText,
  footerLinkTo,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6 border border-teal-100"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-700">
        {title}
      </h2>

      {fields.map((field) => (
        <input
          key={field.name}
          className="w-full p-3 border border-teal-300 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder={field.placeholder}
          type={field.type}
          onChange={field.onChange}
          required
        />
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-50"
      >
        {isLoading ? submitText.loading : submitText.default}
      </button>

      <div className="text-center text-sm text-gray-600">
        {footerText}{" "}
        <Link to={footerLinkTo} className="text-teal-500 font-medium hover:underline">
          {footerLinkText}
        </Link>
      </div>

      {error && (
        <p className="text-red-500 text-center text-sm">
          {error.response?.data?.message || "An error occurred"}
        </p>
      )}
    </form>
  );
} 