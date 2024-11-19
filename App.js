import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleDeleteItem = (itemId) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            setItems(prevItems => prevItems.filter(item => item.id !== itemId));
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddItemForm onAddItem={handleAddItem} />
      <ItemList 
        items={items} 
        onDeleteItem={handleDeleteItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});