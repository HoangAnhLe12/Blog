const Handlebars = require('handlebars');

module.exports = {
   sum: (a, b) => a + b,
   sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default';
      const icons = {
         default: 'bi bi-chevron-bar-expand',
         asc: ' bi bi-sort-alpha-down',
         desc: 'bi bi-sort-alpha-up',
      };

      const types = {
         default: 'asc',
         asc: 'desc',
         desc: 'asc',
      };

      const type = types[sortType];

      const icon = icons[sortType] === undefined ? icons.default : icons[sortType];

      const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);
      const output = `
          <a href="${href}">
             <i class="${icon}"></i>
          </a>
       `;
      return new Handlebars.SafeString(output);
   },
};
