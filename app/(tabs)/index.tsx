import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function Index() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');

  const courseOptions = ['Starter', 'Main Course', 'Dessert'];

  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      dishName: 'Boerewors & Pap',
      description: 'Traditional South African sausage served with creamy pap and spicy chakalaka. A beloved braai-side classic featuring robust, coarsely ground boerewors spiced with coriander, cloves, and nutmeg.',
      course: 'Starter',
      price: '55.00',
    },
    {
      id: '2',
      dishName: 'Bobotie Spring Rolls',
      description: 'Crispy spring rolls filled with spiced beef bobotie mix, served with yellow rice. A modern fusion of South African flavors featuring aromatic, Cape Malay-spiced beef wrapped in golden, crunchy pastry.',
      course: 'Starter',
      price: '45.00',
    },
     {
     id: '3',
      dishName: 'Lamb Sosaties',
      description: 'Traditional South African Tender skewers featuring lamb marinated in sweet and spicy curry sauce, served over a bed of fragrant basmati rice to absort the rich Cape Malay spices.',
      course: 'Main Course',
      price: '85.00',  
    }
  ]);

  const totalItems = menuItems.length;
  const averagePrice =
    totalItems > 0
      ? (
          menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0) /
          totalItems
        ).toFixed(2)
      : '0.00';

  const handleAddDish = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields before submitting.');
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid positive price.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course: course,
      price: numericPrice.toFixed(2),
    };

    setMenuItems((prevItems) => [newItem, ...prevItems]);
    Alert.alert('Success', `"${newItem.dishName}" added to the menu board!`);

    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>Chef's Menu Board</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Total Items: {totalItems}</Text>
              <Text style={styles.statsDivider}>•</Text>
              <Text style={styles.statsText}>Average Price: R{averagePrice}</Text>
            </View>
          </View>

          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add New Menu Item</Text>
            <Text style={styles.cardSubtitle}>
              Create a new dish to add to your menu board.
            </Text>

            <Text style={styles.label}>Dish Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Spicy Shrimp Pasta"
              placeholderTextColor="#A1A1AA"
              value={dishName}
              onChangeText={setDishName}
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add a short description of the dish..."
              placeholderTextColor="#A1A1AA"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Course *</Text>
            <View style={styles.courseChipContainer}>
              {courseOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.courseChip,
                    course === option && styles.courseChipSelected,
                  ]}
                  onPress={() => setCourse(option)}
                >
                  <Text
                    style={[
                      styles.courseChipText,
                      course === option && styles.courseChipTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Price (R) *</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#A1A1AA"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setDishName('');
                  setDescription('');
                  setPrice('');
                }}
              >
                <Text style={styles.cancelButtonText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddDish}
              >
                <Text style={styles.saveButtonText}>Save Dish</Text>
              </TouchableOpacity>
            </View>
          </View>

          
          <View style={styles.listSection}>
            <Text style={styles.sectionTitle}>
              Menu Items ({menuItems.length})
            </Text>

            {menuItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No menu items added yet.</Text>
                <Text style={styles.emptySubText}>
                  Use the form above to add your first dish.
                </Text>
              </View>
            ) : (
              <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.dishCard}>
                    <View style={styles.dishHeader}>
                      <Text style={styles.dishTitle}>{item.dishName}</Text>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.course}</Text>
                      </View>
                    </View>
                    <Text style={styles.dishDescription}>
                      {item.description}
                    </Text>
                    <Text style={styles.dishPrice}>R{item.price}</Text>
                  </View>
                )}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1 },
  scrollContainer: { padding: 20 },
  headerContainer: { marginBottom: 20 },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statsText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  statsDivider: { marginHorizontal: 8, color: '#94A3B8' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 3,
  },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  cardSubtitle: { fontSize: 13, color: '#64748B', marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
    color: '#0F172A',
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  courseChipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  courseChip: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  courseChipSelected: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  courseChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  courseChipTextSelected: {
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 24,
  },
  cancelButton: { paddingVertical: 12, paddingHorizontal: 20, marginRight: 10 },
  cancelButtonText: { color: '#64748B', fontWeight: '600', fontSize: 15 },
  saveButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  saveButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  listSection: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: { fontSize: 15, fontWeight: '600', color: '#64748B' },
  emptySubText: { fontSize: 13, color: '#94A3B8', marginTop: 4 },
  dishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dishTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  badge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { color: '#EA580C', fontSize: 12, fontWeight: '700' },
  dishDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
    lineHeight: 20,
  },
  dishPrice: { fontSize: 16, fontWeight: '800', color: '#FF6B00' },
});
