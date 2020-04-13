import babel from 'rollup-plugin-babel';

export default {
  input: './src/index.jsx',
  output: {
    file: './dist/index.js',
  },
  plugins: [babel()],
};
