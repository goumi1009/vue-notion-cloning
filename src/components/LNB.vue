<template>
  <nav
    ref="nav"
    :style="{width: `${navWidth}px`}"
    class="nav">
    <header class="nav__header">
      <div class="user-profile">
      </div>
      <h1>Goum's Notion</h1>
    </header>
    <ul>
      <WorkspaceItem
        v-for="workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace" />
    </ul>
    <div class="actions">
      <div
        class="action"
        @click="$store.dispatch('workspace/createWorkspace')">
        <span class="material-icons">add</span> 새로운 페이지 
      </div>
    </div>
    <div
      ref="resizeHandle"
      class="resize-handle"
      @dblclick="navWidth= 240"></div>
  </nav> 
</template>

<script>
import interact from 'interactjs';
import WorkspaceItem from '~/components/WorkspaceItem';
export default {
  components: {
    WorkspaceItem
  },
  data() {
    return {
      navWidth: 240
    };
  },
  computed: {
    workspaces() {
      return this.$store.state.workspace.workspaces;
    }
  },
  created() {
    this.workspaceInit();
  },
  mounted() {
    this.navInit();
  },
  methods: {
    async workspaceInit() {
      await this.$store.dispatch('workspace/readWorkspaces');
      if(this.$route.fullPath === '/') {
        this.$router.push({
          name: 'Workspace',
          params: {
            id: this.$store.state.workspace.workspaces[0].id
          }
        });
      }
    },
    navInit() {
      interact(this.$refs.nav)
        .resizable({
          edges: {
            right: this.$refs.resizeHandle
          }
        })
        .on('resizemove', event=> {
          this.navWidth = event.rect.width;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  position: relative;
  height: 100%;
  max-width: 500px;
  min-width: 160px;
  background-color: $color-bg;

  &__header {
    display: flex;
    align-items: center;
    padding: 16px;

    h1 {
      margin-left: 8px;
      font-size: 16px;
      font-weight: 700;
    }
    
    .user-profile {
      width: 24px;
      height: 24px;
      border-radius: 5px;
      background: url("https://yt3.ggpht.com/ytc/AKedOLRZ1y2qg-EFOlDJX670FNKssyUR0D_9LQEAECzP=s900-c-k-c0x00ffffff-no-rj") no-repeat center/cover;
    }
  }

  ul {
    flex-grow: 1;
    overflow-y: auto;
  }

  .actions {
    border-top: 1px solid $color-border;
    .action {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 14px;
      color: $color-icon;
      cursor: pointer;
      &:hover {
        background-color: $color-bg-hover1;
      }
      .material-icons {
        margin-right: 4px;
        color: $color-icon;
      }
    }
  }
  .resize-handle {
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    cursor: col-resize;
    transition: .4s;
    &:hover {
      background-color: $color-border;
    }
  }

}
</style>