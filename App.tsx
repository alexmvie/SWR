import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

type Post = {
      userId: number;
      id: number;
      title: string;
      body: string;
};

export default function App() {
      const { data, isLoading, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

      if (isLoading) {
            return (
                  <SafeAreaView style={styles.container}>
                        <ActivityIndicator size='large' />;
                  </SafeAreaView>
            );
      }

      if (error) {
            return (
                  <SafeAreaView style={styles.container}>
                        <Text>failed to load due to {error?.message}</Text>
                  </SafeAreaView>
            );
      }

      console.log(JSON.stringify(data, null, 2));

      return (
            <SafeAreaView style={styles.container}>
                  <Text>Loaded Data:</Text>
                  {data.map((post: Post) => (
                        <View
                              key={post.id}
                              style={{ padding: 10 }}
                        >
                              <Text style={{ fontWeight: 'bold' }}>{post.title}</Text>
                              <Text style={{ fontStyle: 'italic', paddingHorizontal: 10 }}>{post.body}</Text>
                        </View>
                  ))}
                  <StatusBar style='auto' />
            </SafeAreaView>
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: '#fff',
      },
});
