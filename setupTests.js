const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() });