import { ref, onMounted, onUnmounted, Ref } from 'vue';
// 点击子元素时，列表不隐藏。
// 点击页面其它元素时，列表隐藏
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
    // 是否包含属性
    const isClickOutside = ref(false)
    const contain = (e: MouseEvent) => {
        // 点击元素是列表子元素 返回false
        if (elementRef.value?.contains(e.target as HTMLElement)) {
            isClickOutside.value = false
        } else {
            isClickOutside.value = true
        }
    }
    onMounted(() => {
        document.addEventListener('click', contain)
    })
    onUnmounted(() => {
        document.removeEventListener('click', contain)
    })

    return isClickOutside
}

export default useClickOutside