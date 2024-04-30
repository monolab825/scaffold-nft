export function DescriptionInput() {
  return (
    <div className="w-full">
      <label htmlFor="first_name" className="text-center block text-sm font-medium text-gray-900 dark:text-white">
        Description
      </label>
      <textarea
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Scaffold NFTs are great! Deploy your own collection or view any other collection on a variety of chains!"
        required
      />
    </div>
  );
}
