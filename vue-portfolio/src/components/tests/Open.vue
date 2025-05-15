<template>
  <div class="container py-4">
    <button @click="showMessages" class="btn btn-primary">
      Показать сообщения
    </button>
    
    <MessagesModal 
      ref="messagesModal"
    />
  </div>
</template>

<script>
import MessagesModal from './Test.vue'

export default {
  name: "OpenTest",
  components: {
    MessagesModal
  },
  data() {
    return {
      messages: [
        {
          text: 'Привет! Как твой проект продвигается? У меня есть несколько идей для улучшения.',
          sender: {
            name: 'Иван Петров',
            avatar: null
          },
          date: '2023-05-15T14:30:00'
        },
        {
          text: 'Нашел интересную статью по теме, которую мы обсуждали вчера. Посмотри, может быть полезно: https://example.com/article',
          sender: {
            name: 'Мария Сидорова',
            avatar: 'https://i.pravatar.cc/150?img=3'
          },
          date: '2023-05-14T09:15:00'
        },
        {
          text: 'Напоминаю о нашем созвоне завтра в 11:00. Не забудь подготовить презентацию.',
          sender: {
            name: 'Алексей Иванов',
            avatar: 'https://i.pravatar.cc/150?img=5'
          },
          date: '2023-05-13T18:45:00'
        },
        {
          text: 'Напоминаю о нашем созвоне завтра в 11:00. Не забудь подготовить презентацию.',
          sender: {
            name: 'Алексей Иванов',
            avatar: 'https://i.pravatar.cc/150?img=5'
          },
          date: '2023-05-13T18:45:00'
        },
        {
          text: 'Напоминаю о нашем созвоне завтра в 11:00. Не забудь подготовить презентацию.',
          sender: {
            name: 'Алексей Иванов',
            avatar: 'https://i.pravatar.cc/150?img=5'
          },
          date: '2023-05-13T18:45:00'
        },{
          text: 'Напоминаю о нашем созвоне завтра в 11:00. Не забудь подготовить презентацию.',
          sender: {
            name: 'Алексей Иванов',
            avatar: 'https://i.pravatar.cc/150?img=5'
          },
          date: '2023-05-13T18:45:00'
        }
      ]
    }
  },
  methods: {
    showMessages() {
      this.$refs.messagesModal.show(24)
    }
  }
}
</script>