<template>
/* eslint-disable */
  <div class="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
    <h1 class="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My Company</h1>
    <form action="#" class="w-full flex flex-col gap-4">
      <div class="flex items-start flex-col justify-start">
        <label for="firstName" class="text-sm text-gray-700 dark:text-gray-200 mr-2">First Name:</label>
        <input type="text" id="firstName" name="firstName" class="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
      </div>
	  
      <div class="flex items-start flex-col justify-start">
        <label for="lastName" class="text-sm text-gray-700 dark:text-gray-200 mr-2">Last Name:</label>
        <input type="text" id="lastName" name="lastName" class="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
      </div>
	  
      <div class="flex items-start flex-col justify-start">
        <label for="Número" class="text-sm text-gray-700 dark:text-gray-200 mr-2">Seu número:</label>
        <input type="tel" id="phone" name="nume=ber" pattern="^[0-9]{0,3}-[9]-[0-9]{4}-[0-9]{4}$" maxlength="2" placeholder="(DDD) + Número" class="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="username" class="text-sm text-gray-700 dark:text-gray-200 mr-2">Username:</label>
        <input type="text" id="username" name="username" class="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="email" class="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
        <input type="email" id="email" name="email" class="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="password" class="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
        <input type="password" id="password" name="password" class="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="confirmPassword" class="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" class="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
      </div>
	  <select name="Gender" id="Gender-select"  class="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 ">
  <option value="Gender">Defina seu gênero</option>
  <option id="Men">Homem</option>
  <option id="Woman">Mulher</option>
  <option id="Undefined">Não me identificar</option>
  <option id="Other">Outros...</option>
</select>

      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">Register</button>
    </form>

    <div class="mt-4 text-center">
      <span class="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
      <a href="#" class="text-blue-500 hover:text-blue-600">Login</a>
    </div>
<p class="text-sm font-light text-gray-500 dark:text-gray-400">
  Não tem uma conta?
  <a
    href="/register"
    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
    >Cadastre-se</a>
</p>	
  </div>
</template>


