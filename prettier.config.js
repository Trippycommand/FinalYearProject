module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    'server-only',
    '<THIRD_PARTY_MODULES>|^@/packages(.*)$',
    '^@/schemas(.*)$',
    '^[./|@/]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ['clsx', 'tw', 'cva'],
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
}
