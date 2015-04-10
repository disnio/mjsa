## 站内搜索配置 haystack ##

2015-04-02 武绍春

pip install jieba whoosh

配置 settings中的 HAYSTACK_CONNECTIONS 如下：

    HAYSTACK_CONNECTIONS = {
    'default': {
    'ENGINE': 'haystack.backends.whoosh_cn_backend.WhooshEngine',
    'PATH': os.path.join(os.path.dirname(__file__), 'whoosh_index'),
    'EXCLUDED_INDEXES': ['oscar.apps.catalogue.search_indexes.ProductIndex'],
    },
    }

在 INSTALLED_APPS 的 get_core_apps 中添加 'apps.search'

在 site-packages\django_haystack-2.3.1-py2.7.egg\haystack\backends
  
可直接修改 whoosh_backend.py 或 复制此文件更名为 whoosh_cn_backend.py

from jieba.analyse import ChineseAnalyzer
更改函数 build_schema 170 行的 else 语句为： 主要在 ChineseAnalyzer()

    else:
    schema_fields[field_class.index_fieldname] = TEXT(stored=True, analyzer=ChineseAnalyzer(), field_boost=field_class.boost, sortable=True)

ChineseAnalyzer() 在 jieba/analyse 的 analyzer.py 中
