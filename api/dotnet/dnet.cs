<system.webServer>
<httpProtocol>
  <customHeaders>
    <add name="P3P" value="CP=CAO PSA OUR" />
    <add name="Access-Control-Allow-Origin" value="*" />
    <add name="Access-Control-Allow-Headers" value="Content-Type" />
    <add name="Access-Control-Allow-Methods" value="GET, POST, PUT, DELETE, OPTIONS" />
  </customHeaders>
</httpProtocol>
</system.webServer>

surging 服务引擎,提供了轻量级，高性能，模块化的RPC请求管道
Consul 可以做服务发现注册,健康检查
Polly 可以做服务熔断,降级,处理部分失败
Ocelot 可以做API网关,统一权限管理,负载均衡