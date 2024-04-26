import { extractStyle } from '@ant-design/static-style-extract';
import { ConfigProvider } from 'antd';
import { writeFileSync } from 'fs';
import { createElement } from 'react';
import { THEME_CONFIG } from '../theme';

const OUTPUT_PATH = './src/scripts/antd.min.css';

const CSS = extractStyle((node) =>
	createElement(ConfigProvider, { theme: THEME_CONFIG }, node),
);

writeFileSync(OUTPUT_PATH, CSS);
