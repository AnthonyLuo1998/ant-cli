module.exports = {
  extends: ['@commitlint/config-conventional'], // 使用常规的 commitlint 配置文件
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ], // 定义允许的提交类型
    'scope-case': [2, 'always', 'lower-case'], // 强制提交范围为小写
    'subject-case': [0], // 不强制主题大小写（但通常建议使用 sentence-case）
    'subject-empty': [2, 'never'], // 禁止空的提交主题
    'subject-full-stop': [0, 'never'], // 不强制主题以句号结尾
    'header-max-length': [2, 'always', 72], // 强制 header 最大长度为 72 个字符
    'body-leading-blank': [1, 'always'], // 强制 body 前面有一个空行
    'footer-leading-blank': [1, 'always'], // 强制 footer 前面有一个空行
    'footer-max-line-length': [2, 'always', 80] // 强制 footer 的每行最大长度为 80 个字符
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\(([\w$\.,\s]*?)\))?\s*:(.*)$/, // 自定义 header 的正则表达式
      headerCorrespondence: ['type', 'scope', 'subject'] // 与 headerPattern 匹配的部分
    }
  }
}
