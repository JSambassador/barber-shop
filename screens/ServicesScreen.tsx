import React, { useState } from "react";
import { View, StyleSheet, Pressable, Image, Modal, ScrollView } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { MOCK_SERVICES } from "@/models/mockData";
import { useLanguage } from "@/hooks/useLanguage";

export default function ServicesScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [services] = useState(MOCK_SERVICES);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const currentService = services.find((s) => s.id === selectedService);

  return (
    <>
      <ScreenScrollView>
        <View style={styles.section}>
          {services.map((service) => (
            <Pressable
              key={service.id}
              onPress={() => {
                setSelectedService(service.id);
                setShowPreview(true);
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Card style={styles.serviceCard}>
                {service.photo && typeof service.photo === 'number' && (
                  <Image
                    source={service.photo}
                    style={styles.servicePhoto}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.serviceContent}>
                  <View style={styles.serviceInfo}>
                    <ThemedText style={styles.serviceName}>
                      {service.name}
                    </ThemedText>
                    <ThemedText
                      style={[styles.serviceDesc, { color: theme.textSecondary }]}
                    >
                      {service.description}
                    </ThemedText>
                    <View style={styles.serviceDetails}>
                      <View
                        style={[
                          styles.priceBadge,
                          { backgroundColor: theme.primary },
                        ]}
                      >
                        <ThemedText
                          style={[styles.priceText, { color: theme.buttonText }]}
                        >
                          ${service.price}
                        </ThemedText>
                      </View>
                      <ThemedText style={{ color: theme.textSecondary }}>
                        {service.duration} min
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.actionRight}>
                    <Feather name="edit-2" size={20} color={theme.primary} />
                    <Feather name="chevron-right" size={20} color={theme.primary} />
                  </View>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Pressable
            style={[styles.addButton, { backgroundColor: theme.primary }]}
          >
            <Feather name="plus" size={20} color={theme.buttonText} />
            <ThemedText
              style={[styles.addButtonText, { color: theme.buttonText }]}
            >
              {t("addService") || "Add New Service"}
            </ThemedText>
          </Pressable>
        </View>
      </ScreenScrollView>

      {/* Service Preview Modal */}
      <Modal
        visible={showPreview && !!currentService}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.backgroundRoot }]}>
          <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
            <Pressable onPress={() => setShowPreview(false)}>
              <Feather name="x" size={24} color={theme.text} />
            </Pressable>
            <ThemedText style={styles.modalTitle}>{t("servicesTitle") || "Services"}</ThemedText>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
            {currentService?.photo && typeof currentService.photo === 'number' && (
              <Image
                source={currentService.photo}
                style={styles.largeServicePhoto}
                resizeMode="contain"
              />
            )}

            <Card style={styles.serviceDetailsCard}>
              <ThemedText style={styles.largeServiceName}>
                {currentService?.name}
              </ThemedText>
              <ThemedText style={[styles.largeServiceDesc, { color: theme.textSecondary }]}>
                {currentService?.description}
              </ThemedText>

              <View style={styles.detailsGrid}>
                <View style={styles.detailBox}>
                  <Feather name="dollar-sign" size={24} color={theme.primary} />
                  <ThemedText style={styles.detailLabel}>{t("servicePrice") || "Price"}</ThemedText>
                  <ThemedText style={styles.detailValue}>
                    ${currentService?.price}
                  </ThemedText>
                </View>

                <View style={styles.detailBox}>
                  <Feather name="clock" size={24} color={theme.primary} />
                  <ThemedText style={styles.detailLabel}>{t("serviceDuration") || "Duration"}</ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {currentService?.duration} {t("minutes") || "min"}
                  </ThemedText>
                </View>
              </View>

              <Pressable
                style={[styles.selectButton, { backgroundColor: theme.primary }]}
              >
                <Feather name="check" size={20} color={theme.buttonText} />
                <ThemedText style={[styles.selectButtonText, { color: theme.buttonText }]}>
                  {t("select") || "Select This Service"}
                </ThemedText>
              </Pressable>
            </Card>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  serviceCard: {
    marginBottom: Spacing.md,
    overflow: "hidden",
  },
  servicePhoto: {
    width: "100%",
    height: 240,
    marginBottom: Spacing.md,
  },
  serviceContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  serviceDesc: {
    fontSize: 14,
    marginBottom: Spacing.md,
  },
  serviceDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  priceBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
  },
  actionRight: {
    flexDirection: "row",
    gap: Spacing.sm,
    alignItems: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    gap: Spacing.sm,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  largeServicePhoto: {
    width: "100%",
    height: 350,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xl,
  },
  serviceDetailsCard: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    gap: Spacing.lg,
  },
  largeServiceName: {
    fontSize: 28,
    fontWeight: "700",
  },
  largeServiceDesc: {
    fontSize: 16,
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: "row",
    gap: Spacing.lg,
  },
  detailBox: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.sm,
  },
  detailLabel: {
    fontSize: 12,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
