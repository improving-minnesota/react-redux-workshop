import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import 'typeface-roboto';

export default new Typography({
  headerFontFamily: ['Roboto', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
  plugins: [new CodePlugin()],
});
