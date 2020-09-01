import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
    {
        input: 'src/redaptivecards.ts',
        plugins: [
            typescript()
        ],
        output: [
            {
                file: pkg.module,
                format: 'es'
            }
        ]
    }
]