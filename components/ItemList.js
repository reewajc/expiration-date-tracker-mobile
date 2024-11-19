import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// You can use any icon library. Here's an example with MaterialIcons
import { MaterialIcons } from '@expo/vector-icons';

const ItemList = ({ items, onDeleteItem }) => {
  const renderItem = ({ item }) => {
    const daysUntilExpiration = Math.ceil(
      (new Date(item.expirationDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

    return (
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDate}>
            Expires: {new Date(item.expirationDate).toLocaleDateString()}
          </Text>
          <Text style={[
            styles.daysLeft,
            daysUntilExpiration <= 3 ? styles.warning : null,
            daysUntilExpiration <= 0 ? styles.expired : null,
          ]}>
            {daysUntilExpiration <= 0 
              ? 'EXPIRED' 
              : `${daysUntilExpiration} days left`}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => onDeleteItem(item.id)}
        >
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  // ... existing styles ...
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  deleteButton: {
    padding: 10,
  },
});

export default ItemList;