<template>
  <div name="AboutMain" class="AboutMain-wrap">
    <el-row type="flex" style="align-items: center">
      <div class="titleline"></div>
      <span class="title" style="margin: 0 0 0 15px">关于本系统</span>
    </el-row>

    <div>
      <p>
        欢迎使用产业链分析系统
        <span style="font-style: italic">chain_analyst</span> ！
      </p>

      <p>
        本系统旨在实现有关于制造产业链数据的拓扑结构可视化、制造产业链完整性评估以及制造产业链风险评估三大主要功能，帮助用户理清产业链数据的拓扑结构，并给出相应的完整性与风险评测的结果以供参考，提供用户最清晰、最友好的产业链分析服务。
      </p>

      <p>以下是本系统使用的相关说明：</p>

      <h2>1. 产业链数据的上传与提交</h2>

      <p>本系统为用户提供了两种产业链数据的上传形式：</p>

      <ol>
        <li>手动填写产业链数据进行上传</li>
        <li>上传一定格式的txt文件进行导入</li>
      </ol>

      <h3>1.1 手动填写产业链数据进行上传</h3>

      <p>
        当用户选择手动填写产业链数据进行上传时，需要根据弹窗提示分三步进行信息的填写：
      </p>

      <ol>
        <li>产业链的基本信息填写；</li>
        <li>产业链节点的录入；</li>
        <li>产业链边的录入。</li>
      </ol>

      <p>
        基本信息填写包括产业链的命名、产业链的类别以及用户选填的产业链概况介绍。
      </p>

      <p>
        在本系统中，产业链总的节点类别分为所属行业、附属行业、子行业、涉及公司、主营产品、产品小类、涉及材料七大类，并从左到右呈现明显的层次关系，用户在录入节点时需要根据实际产业链的情况将其抽象为此处的七类进行录入，以确保本产业链分析系统的正常进行。
      </p>

      <p>
        产业链边的录入则基于先前节点的录入情况。用户在进行边的录入时，需要选择节点类型(首和尾)、选择具体节点(首和尾)，最后录入边的名称完成一条边的构建，并且<strong>在构建边时选择的节点只能为上下层的关系，不可越级选取首尾节点</strong>，如选择子行业为尾节点、所属行业为首节点是错误的。
      </p>

      <p>
        当上述的三步进行完毕后，产业链的模型便构建完成，绘出产业链的可视化结构供用户参考，进行下一步操作。
      </p>

      <h3>1.2 上传一定格式的txt文件进行导入</h3>

      <p>
        当用户选择上传一定格式的txt文件的方式进行产业链数据的上传时，需要根据弹窗提示进行两步操作：
      </p>

      <ol>
        <li>产业链的基本信息填写；</li>
        <li>txt文件的上传。</li>
      </ol>

      <p>
        在产业链的基本信息填写阶段，与手动填写上传的方式相同，需要录入产业链的命名、产业链的类别以及用户选填的产业链概况介绍，以便用户对该模型进行标识。
      </p>

      <p>
        在txt文件上传阶段，用户需要根据实际的产业链数据，将数据进行一定格式的txt文件重构。以下给出该txt文件模板：
      </p>

      <div class="txt_code">
        <code>
          ===根节点start===<br />(所属行业)<br />===根节点end===<br />===第一条边start===
          <br />(首节点：附属行业)<br />上级行业<br />(尾结点：所属行业)<br />===第一条边end===
          <br />===第二节点start===<br />(附属行业)<br />===第二节点end===<br />===第二条边start===
          <br />(首节点：子行业)<br />上级行业<br />(尾结点：附属行业)<br />===第二条边end===
          <br />===第三节点start===<br />(子行业)<br />===第三节点end===<br />===第三条边start===
          <br />(首节点：公司×n)<br />所属行业×n<br />(尾结点：子行业)<br />===第三条边end===
          <br />===第四节点start===<br />(公司)×n<br />===第四节点end===<br />===第四条边start===
          <br />(首节点：产品×n）<br />主营产品×n<br />(尾结点：公司×n)<br />===第四条边end===
          <br />===第五节点start===<br />(产品)×n<br />===第五节点end===<br />===第五条边start===
          <br />(首节点：产品小类×n)<br />产品小类×n<br />(尾结点：产品×n)<br />===第五条边end===
          <br />===第六节点start===<br />(产品小类)×n<br />===第六节点end===<br />===第六条边start===
          <br />(首节点：涉及材料×n)<br />涉及材料×n<br />(尾结点：产品小类)×n<br />===第六条边end===
          <br />===第七节点start===<br />(涉及材料)×n<br />===第七节点end===
        </code>
      </div>

      <p>用户可以复制上述txt文件模板，结合实际需要进行产业链数据文件的构建。</p>

      <p>
        在根据该格式对产业链数据进行规范化之后，便能够成功进行文件的上传。系统读取文件数据并分析，最终实现与手动上传功能相同的可视化呈现与完整性、风险评估分析。
      </p>

      <p>
        <strong
          >若用户上传的txt文件不符合该规范格式，会导致文件无法正确上传并引发系统报错。因此，用户在选择运用txt文件进行上传时，需要提前按照上述模板进行规范化的文件编写完毕，再进行文件上传导入。</strong
        >
      </p>

      <h2>2. 系统主要实现功能</h2>

      <p>本系统基于产业链的分析与评估的目的，主要实现了以下三大功能：</p>

      <ol>
        <li>
          产业链数据拓扑结构可视化：将用户提交上传的产业链数据进行知识图谱结构的可视化，用户能够对节点进行移动、缩放、隐藏等操作。
        </li>
        <li>
          产业链完整性分析与评估：根据用户提交的产业链相关的数据，对整体的拓扑结构进行完整性分析，并最终通过完整性指数的方式进行结果呈现，以供用户参考。
        </li>
        <li>
          产业链风险评估：根据用户提交的产业链相关的数据，对整体的拓扑结构进行风险评估，并最终通过风险指数的方式进行结果呈现，同时给出了详细的风险可能性与相应的解决处理方案以供用户参考。
        </li>
      </ol>

      <p>感谢您的使用！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutMain",
};
</script>

<style scoped>
.AboutMain-wrap {
  position: relative;
  width: 1170px;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  padding: 30px 40px 40px;
  margin: 60px auto 0;
}
.titleline {
  width: 12px;
  height: 73px;
  background: #00ff7b;
}
.title {
  font-family: Microsoft YaHei;
  font-size: 36px;
  font-weight: bold;
  color: #3d3d3d;
}
.infoform > * {
  margin: 20px auto 0;
}
.infoform span {
  font-family: Source Han Sans CN;
  font-size: 24px;
  font-weight: normal;
  color: #3d3d3d;
}
::v-deep .el-input__inner {
  width: 400px;
  height: 60px;
  background: #ffffff;
  border-radius: 15px;
}
.button {
  width: 180px;
  height: 80px;
  border-radius: 40px;
  background: #00ff7b;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.button:hover {
  box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.button span {
  font-family: Source Han Sans CN;
  font-size: 32px;
  font-weight: normal;
  color: #ffffff;
}
.txt_code {
  border-radius: 30px;
  padding: 25px;
  border: 5px dashed #9e9e9e;
}
</style>