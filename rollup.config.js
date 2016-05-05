import rollup from 'rollup';
import json from 'rollup-plugin-json';

rollup.rollup({
  entry: './src/js/service-worker.js',
  plugins: [json()]
}).then(function (bundle) {
  bundle.write({
    dest: './public/service-worker.js'
  });
}).catch(function (error) {
  console.error(JSON.stringify(error, null, 2));
});

export default {
  entry: './src/js/app.js',
  dest: './public/js/app.js'
}
