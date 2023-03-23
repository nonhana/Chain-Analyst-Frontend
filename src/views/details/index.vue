<template>
  <div class="index">
    <el-row type="flex" justify="center" style="margin: 60px 0 0 0">
      <div
        style="
          display: flex;
          width: 1250px;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <DetailsImg :model_nodes="model_nodes" :model_edges="model_edges" />
        </div>
        <div>
          <DetailsInfo
            :model_name="model_name"
            :model_type="model_type"
            :create_time="create_time"
            :integrity_score="integrity_score"
            :risk_score="risk_score"
          />
        </div>
      </div>
    </el-row>

    <el-row style="margin: 30px 0 0 0" type="flex" justify="center">
      <DetailsIntegrity
        :integrity_score="integrity_score"
        :integrity_details="integrity_evaluation"
        :model_id="model_id"
      />
    </el-row>

    <el-row style="margin: 30px 0 0 0" type="flex" justify="center">
      <DetailsRisk
        :risk_score="risk_score"
        :risk_main="risk_main"
        :risk_method="risk_method"
      />
    </el-row>
  </div>
</template>

<script>
import { getModelInfoAPI, integrityAPI, riskAnalyseAPI } from "@/api/model";
import DetailsImg from "@/components/ModelDetails/DetailsImg.vue";
import DetailsInfo from "@/components/ModelDetails/DetailsInfo.vue";
import DetailsIntegrity from "@/components/ModelDetails/DetailsIntegrity.vue";
import DetailsRisk from "@/components/ModelDetails/DetailsRisk.vue";
export default {
  name: "details-index",
  data() {
    return {
      model_id: this.$route.params.id,
      model_name: "",
      model_type: "",
      create_time: "",
      integrity_score: 0,
      integrity_evaluation: "",
      risk_score: 0,
      risk_main: "",
      risk_method: "",
      model_nodes: [],
      model_edges: [],
      model_nodes_type: ["n", "m1", "m2", "m3", "m4", "m5", "m6"],
      nodes_type: [
        "所属行业",
        "附属行业",
        "子行业",
        "涉及公司",
        "主营产品",
        "产品小类",
        "涉及材料",
      ],
    };
  },
  components: {
    DetailsImg,
    DetailsInfo,
    DetailsIntegrity,
    DetailsRisk,
  },
  mounted() {
    getModelInfoAPI({ model_id: this.model_id }).then((res) => {
      if (res.data.model_data) {
        if (res.data.model_data.model_nodes) {
          const nodes_source = JSON.parse(
            res.data.model_data.model_nodes.replace(/\'/g, '"')
          );
          this.model_nodes_type.forEach((item, index) => {
            nodes_source[item].forEach((node) => {
              const node_item = {
                name: node.label,
                category: this.nodes_type[index],
              };
              this.model_nodes.push(node_item);
            });
          });
        }
        // 对节点进行去重
        this.model_nodes = this.model_nodes.filter((item, index) => {
          return (
            this.model_nodes.findIndex((obj) => obj.name === item.name) ===
            index
          );
        });
        if (res.data.model_data.model_edges) {
          const edges_source = JSON.parse(
            res.data.model_data.model_edges.replace(/\'/g, '"')
          );
          edges_source.forEach((item) => {
            const edge_item = {
              source: item.start,
              target: item.end,
              name: item.name,
            };
            this.model_edges.push(edge_item);
          });
        }
        this.model_name = res.data.model_data.model_name;
        this.model_type = res.data.model_data.model_type;
        this.create_time = res.data.model_data.create_time;
        integrityAPI({ model_id: this.model_id }).then((res) => {
          if (res.data) {
            this.integrity_score = res.data.integrity_score;
            this.integrity_evaluation = res.data.integrity_evaluation;
          }
        });
        riskAnalyseAPI({ model_id: this.model_id }).then((res) => {
          if (res.data) {
            this.risk_score = res.data.risk_score;
            this.risk_main = res.data.risk_main;
            this.risk_method = res.data.risk_method;
          }
        });
      }
    });
  },
};
</script>

<style scoped>
.index {
  width: 100%;
}
</style>