<script setup lang="ts">
import { onMounted, ref, useSlots, type VNode } from 'vue';

const slots = useSlots();

// Определяем тип VNode для tabs
const tabs = ref<VNode[]>([]);
const indicator = ref<HTMLElement | null>(null);

const getAllTabs = () => {
    // Проверяем наличие слота nav
    const children = slots.nav ? slots.nav : [];

    // Присваиваем массив VNode в tabs
    tabs.value = children as VNode[];
};

onMounted(() => getAllTabs());

</script>

<template>
    <div class="q-tab-group">
        <div class="tab-group__nav-container">
            <div class="tab-group__nav">
                <div class="tab-group__tabs">
                    <slot name="nav" />
                </div>
                <div ref="indicator" class="q-tab-group__indicator"></div>
            </div>
        </div>
    </div>
</template>

<style src="./QTabGroup.style.scss" lang="scss" scoped></style>