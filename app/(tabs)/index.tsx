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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [editingId, setEditingId] = useState(null); 

  const courseOptions = ['Starter', 'Main Course', 'Dessert'];
  const filterOptions = ['All', 'Starter', 'Main Course', 'Dessert'];
 
  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      dishName: 'Boerewors & Pap',
      description: 'Tradditional South African sausage served with creamy pap and spicy chakalaka. a beloved braai-side classic featuring robust, coarsely ground boerewors spiced with coriander, cloves, and nutmeg.',
      course: 'Starter',
      price: '55.00',
    },
    {
      id: '2',
      dishName: 'Bobotie Spring Rolls',
      description: 'Crispy spring rolls filled with spiced beef bobotie mix, served with yellow rice. A modern fusion of South African flavors featuring aromatic, Cape Malay-spiced beef wrapped in golden , crunchy pastry.',
      course: 'Starter',
      price: '45.00',
    },
    {
      id: '3',
      dishName: 'Lamb Sosaties',
      description: 'Traditional South African Tender skewers featuring lamb marinated in sweet and spicy curry sauce, served over a bed of fragrant basmati rice to absorb the rich Cape Malay spices.',
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

 
  const getCategoryAverage = (catName: any) => {
    const catItems = menuItems.filter((i) => i.course === catName);
    if (catItems.length === 0) return '0.00';
    const sum = catItems.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
    return (sum / catItems.length).toFixed(2);
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.dishName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || item.course === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSaveDish = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields before submitting.');
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid positive price.');
      return;
    }

    if (editingId) {
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingId
            ? {
                ...item,
                dishName: dishName.trim(),
                description: description.trim(),
                course: course,
                price: numericPrice.toFixed(2),
              }
            : item
        )
      );
      Alert.alert('Success', `"${dishName.trim()}" updated successfully!`);
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now().toString(),
        dishName: dishName.trim(),
        description: description.trim(),
        course: course,
        price: numericPrice.toFixed(2),
      };

      setMenuItems((prevItems) => [newItem, ...prevItems]);
      Alert.alert('Success', `"${newItem.dishName}" added to the menu board!`);
    }

   
    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };

  const confirmDelete = (item: any) => {
    Alert.alert(
      'Delete Dish',
      'Are you sure you want to remove "' + item.dishName + '" from the menu',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems(menuItems.filter((dish) => dish.id !== item.id));
            if (editingId === item.id) {
              handleCancelEdit();
            }
          },
        },
      ]
    );
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
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalItems}</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>R{averagePrice}</Text>
                <Text style={styles.statLabel}>Avg Price</Text>
              </View>
            </View>

            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownText}>Starter: R{getCategoryAverage('Starter')}</Text>
              <Text style={styles.breakdownText}>Main: R{getCategoryAverage('Main Course')}</Text>
              <Text style={styles.breakdownText}>Dessert: R{getCategoryAverage('Dessert')}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.formHeaderRow}>
              <Text style={styles.cardTitle}>
                {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
              </Text>
              {editingId && (
                <TouchableOpacity onPress={handleCancelEdit}>
                  <Text style={styles.cancelEditText}>Cancel Edit</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.cardSubtitle}>
              {editingId ? 'Modify details for this dish.' : 'Create a new dish to add to your menu board.'}
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
              {courseOptions?.map((option) => (
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
                onPress={editingId ? handleCancelEdit : () => {
                  setDishName('');
                  setDescription('');
                  setPrice('');
                }}
              >
                <Text style={styles.cancelButtonText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveDish}
              >
                <Text style={styles.saveButtonText}>
                  {editingId ? 'Update Dish' : 'Save Dish'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchFilterSection}>
            <TextInput
              style={styles.searchInput}
              placeholder="🔍 Search dishes by name..."
              placeholderTextColor="#A1A1AA"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {filterOptions.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterChip,
                    selectedFilter === filter && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedFilter === filter && styles.filterChipTextSelected,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.listSection}>
            <Text style={styles.sectionTitle}>
              Menu Items ({filteredMenuItems.length})
            </Text>

            {filteredMenuItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No menu items found.</Text>
                <Text style={styles.emptySubText}>
                  Try adjusting your search or filter criteria.
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredMenuItems}
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
                    <View style={styles.cardFooter}>
                      <Text style={styles.dishPrice}>R{item.price}</Text>
                      <View style={styles.actionButtonsRow}>
                        <TouchableOpacity 
                          onPress={() => handleEdit(item)}
                          style={styles.editButton}
                        >
                          <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                          onPress={() => confirmDelete(item)}
                          style={styles.deleteButton}
                        >
                          <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
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
  safeArea: { flex: 1, backgroundColor: '#F8FAFC', minHeight: '100%' },
  container: { flex: 1 },
  scrollContainer: { padding: 20 },
  headerContainer: { marginBottom: 20 },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#FF6B00' },
  statLabel: { fontSize: 12, fontWeight: '600', color: '#64748B', marginTop: 2 },
  statDivider: { width: 1, height: '70%'},
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  breakdownText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 3,
  },
  formHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  cancelEditText: { fontSize: 13, fontWeight: '700', color: '#DC2626' },
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
  searchFilterSection: { marginBottom: 20 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    marginBottom: 10,
  },
  filterScroll: { flexDirection: 'row', marginBottom: 4 },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  filterChipText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  filterChipTextSelected: { color: '#FFFFFF' },
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
    borderWidth: 1,
    borderColor: '#F1F5F9',
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonsRow: { flexDirection: 'row', alignItems: 'center' },
  editButton: {
    backgroundColor: '#E0F2FE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  editButtonText: {
    color: '#0369A1',
    fontSize: 12,
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
  },
});