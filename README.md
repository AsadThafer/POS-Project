<p align="center">
    <img src="https://user-images.githubusercontent.com/62269745/174906065-7bb63e14-879a-4740-849c-0821697aeec2.png#gh-light-mode-only" width="40%">
    <img src="https://user-images.githubusercontent.com/62269745/174906068-aad23112-20fe-4ec8-877f-3ee1d9ec0a69.png#gh-dark-mode-only" width="40%">
</p>
<h1 align="center"> Product Management POS System</h1>

POS-Project is a Point-of-Sale application built with React. It is designed to be a web-based application with a sleek and modern user-interface.

## Features

- Login Page (Login page and authentication system)

- Products Page (user can view/add/update/delete a product) :
  - with table that contains all the products with detail for each product.
  - Pagination for the table.
  - Search box to filter the products.
  
- Product Categories Page (user can view/add/update/delete a product category) :
  - A table that contains all the product categories.
  - Pagination for the table.
  - Search box to filter the categories.
- POS Page (page that can be used by the cachier to help with checking out customers carts) :
  - The page has a list of all products. (searchable and filterable by product category)
  - The page has a UI to start a new cart checkout :
   - User add products to the cart.
   - User change added product quantity.
   - User delete a product.
   - User edit the tax.
   - User apply a discount.
   - User checkouts the cart and save it orders Page for logging purposes only.
   - User can clear the cart to empty state when needed .
- Orders Page (user can view/delete/search orders made in the POS Page).

## Documentation

POS-Project-React documentation can be found on notion :
<a href="https://splashy-maraca-654.notion.site/Documentation-826ccec28e6e490099c9891fb7237f49">Notion Documentation</a>

## Installation

POS-Project-React can be easily installed with the following steps:

1. Clone the repository.
2. Install dependencies : npm install
3. Run the development server : npm run dev 
4. watch db.json : json-server --watch public/data/db.json
5. use (admin / admin12345) for login page authentication .


## Support

For any questions or support related to the project, please open an issue on the Github repository.

## Contributing

If you would like to contribute to the project, please fork the repository and make a pull request.

## License

POS-Project-React is licensed under the MIT License.see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- This project is a part of the [Foothill Technology Solutions, LLC.](https://www.foothillsolutions.com/) internship program.
- Thanks to [MohammadAbusaa](https://github.com/MohammadAbusaa) for the his advisory and support during the training period.
