Node.js ReadMe
The first thing i did was to create 2 functions that will be reading 
and writing my files usung the fs module.

TERMS
parse - converst the data into a JSON object 
stringify - Converst the JSON object into a string for the browser to read it 
parseInt - covert my string into a Integer
split - This splits the URL into different sections to that your code can read it 
splice - This is used to change contents in an Array by either removing it 

There are 4 methods GET, POST, PUT, DELETE

GET  
- The get method will be retreiving data from my JSON file and converting it to be readable
- It can also search for a specific product using the ID
- If it does not find a product , you will get a error code

POST
- This method will be used for Adding new items to the list 
- The chunk function will be breaking up the data so that it is easy to handle and converts it back into a string
- There is also a Function that will be adding a new ID to every item that gets added

PUT
- This method is used to update certain things in your array 
- In order to use this method inside your URL to has to use another slash
    and then you add your ID number you want to change 
    - and then on POSTMAN you go to body and Raw and inside the data you wish to change

 data[index]: This accesses an object located at the specified index in the data array.

updatedData: This is another object that contains properties you want to update or add to the object at data[index].

{ ...data[index], ...updatedData }:

- The { ...data[index] } part creates a new object that is a shallow copy of the object at data[index]. 
    -This means it takes all the existing properties of that object.

- The { ...updatedData } part spreads the properties of the updatedData object into the new object. 
    - If any properties in updatedData have the same keys as those in the object from data[index], 
        - they will overwrite the original properties.

- The {data[index] = ...:}
    - this line assigns the newly created object (which contains the updated properties) 
    - back to data[index]. This effectively updates the object in the array with the new values.

DELETE
- This Method will be deleting the product using the ID 
- so you use it similiar to how you find a ID using the URL , you would specify 
    the specific ID you want deleted.

Then finally the code will end with a ELSE statement if no content has been found , it will show a error.



