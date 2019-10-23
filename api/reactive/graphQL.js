
// https://github.com/graphql/express-graphql
// https://www.npmjs.com/package/graphql
// https://principles.graphql.cn/integrity
// https://github.com/chentsulin/awesome-graphql

// graphql-subscriptions !! wipe up GraphQL with a pubsub system to implement subscription in GraphQL.

// graphql-tag it let you write your queries with es2015 template literals and compile them into a ast with the gql tag.

// callback-to-async-iterator  you can turn your standard callback-based listener into an async iterator

// graphql-type-json This package exports a JSON values scalar GraphQL.js type.

// vue-apollo Apollo/GraphQL integration for VueJS

// 基于类型系统来执行查询的服务端运行时 （类型系统由你的数据定义）GraphQL 是关于请求对象上的特定字段。
// GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数。
// GraphQL 查询能够遍历相关对象及其字段，使得客户端可以一次请求查询大量相关数据，而不像传统 REST 架构中那样需要多次往返查询。
// GraphQL 查询语言基本上就是关于选择对象上的字段。

// schema
// 一个关于我们所需要的数据的确切描述依然很有意义，我们能选择什么字段？服务器会返回哪种对象？这些对象下有哪些字段可用？这便是引入 schema 的原因。每一个 GraphQL 服务都会定义一套类型，用以描述你可能从那个服务查询到的数据。每当查询到来，服务器就会根据 schema 验证并执行查询。

// Object Types and Fields 它就表示你可以从服务上获取到什么类型的对象，以及这个对象有什么字段。
// String! 非空字段 [Episole!]! Episole 数组非空。
// 对象类型、标量以及枚举是 GraphQL 中你唯一可以定义的类型种类。 2019-07-29

// apollo-boost 开始 Apollo Client. need graphql and react-apollo, 完全客户端对接react.
// "apollo-cache-inmemory": "^1.5.1",
// "apollo-client" 缓存 graphql 客户端和 react/angular and more 交互。构建 UI 组件获取数据通过 graphql
// https://www.apollographql.com/docs/react/

// "apollo-errors": "^1.9.0",
// "apollo-link": 修改 graphql 请求和获取 graphql 结果 的控制流。
// "apollo-link-error": "^1.1.8",
// "apollo-link-state": "^0.4.2",
// apollo-upload-client 处理各种文件上传
// https://github.com/Akryum/vue-apollo
// apollo-server-express Express and Connect integration of GraphQL Server

// graphql-playground graphql-playground-react 练习模拟场所

// graphql-request 适用于 graphql 的 request promise 客户端
import { request, GraphQLClient } from 'graphql-request'

// gray-matter 可从各种格式文件读取，字符串解析为对象，或反向

// apollo react-apollo
// https://www.apollographql.com/docs/react/essentials/get-started/

import { gql } from "apollo-boost";
// or you can use `import gql from 'graphql-tag';` instead
import {ApolloProvider} from "react-apollo";
import { ApolloProvider } from '@apollo/react-hooks';

//  ussQuery reach hook is the primary api for executing queries in an Apollo app.
// apollo client supports two strategies for updating cached query result: polling and refetching.
// Polling provies near-real-time synchronization with you server by causing a query to execute periodically
// at a specified interval.

// 手动执行查询 https://www.apollographql.com/docs/react/essentials/queries/
// 更新缓存在mutation 后 https://www.apollographql.com/docs/react/essentials/mutations/

// apollo-link-rest
// apollo-link-http get graphql results over a network using http fetch.